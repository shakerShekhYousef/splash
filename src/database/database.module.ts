import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.z6wl1we.mongodb.net/splash?retryWrites=true&w=majority&appName=Cluster0'),
    ],
})
export class DatabaseModule {}