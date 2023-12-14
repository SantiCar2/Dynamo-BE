import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as speakeasy from 'speakeasy';

@Injectable()

export class AuthService{
    constructor(
        private prisma: PrismaService,  //Base de datos
        private jwt:JwtService,         //JWT
        private config: ConfigService,  //Configuración (.env)
    ) { }

    async verify(token: string) {
        try {
            return this.jwt.verify(token, {secret: this.config.get('JWT_SECRET')});
        }catch (error) {
            throw new ForbiddenException(error);
        }
    }
    async signup(dto: AuthDto){
        // Se crea un hash de la contraseña para almacenarla en la base de datos
        const hash = await argon.hash(dto.password);
        const isValid = speakeasy.totp.verify({
            secret: this.config.get('2STEP_SECRET'),
            encoding: 'base32',
            token: dto.twoFA,
        });

        // console.log(isValid, this.config.get('2STEP_SECRET'), dto.twoFA);

        if (!isValid) throw new ForbiddenException('Token de verificación de dos pasos inválido');
        //Guardar el usuario en la base de datos
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                    name: dto.name,
                },
            });

            return this.signToken(user.id, user.email);
            
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Correo ya registrado');
                }
            }
            throw error;
        }
        
        
       
    }
    async login(dto: LoginDto){
        //Buscar el correo en la base de datos
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        //Si el correo no existe, lanzar un error
        if (!user) throw new ForbiddenException('Credenciales incorrectas');

        //Si el correo existe, verificar que la contraseña sea correcta
        const pwMatches = await argon.verify(user.hash, dto.password);

        if (!pwMatches) throw new ForbiddenException('Credenciales incorrectas');

        return this.signToken(user.id, user.email);
    }


    //Generar un token JWT con la información del usuario
    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = { 
            sub: userId, 
            email: email 
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
}