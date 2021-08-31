import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Neo4jService } from 'nest-neo4j/dist';
import { Config } from 'src/config/Config';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    if (await this.existsByEmail(createUserInput.email)) {
      throw new ConflictException([
        {
          field: 'email',
          message: 'A user with this email already exists',
        },
      ]);
    }

    const password = await hash(
      createUserInput.password,
      Config.PASSWORD_HASH_ROUNDS,
    );

    const result = await this.neo4jService.write(
      `
      CREATE (u:User {
        id: $id,
        name: $name,
        email: $email,
        password: $password,
        createdAt: datetime(),
        updatedAt: datetime()
      })
      RETURN u
      `,
      {
        id: randomUUID(),
        name: createUserInput.name,
        email: createUserInput.email,
        password,
      },
    );

    const user = result.records.at(0)?.get('u').properties;

    if (!user) {
      throw new InternalServerErrorException();
    }

    return new User(user as unknown as User);
  }

  async findOne(id: string): Promise<User | null> {
    const result = await this.neo4jService.read(
      `
      MATCH (u:User { id: $id })
      RETURN u
      `,
      { id },
    );

    const user = result.records.at(0)?.get('u').properties;

    if (!user) {
      return null;
    }

    return new User(user as unknown as User);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const result = await this.neo4jService.read(
      `
      MATCH (u:User { email: $email })
      RETURN u
      `,
      { email },
    );

    const user = result.records.at(0)?.get('u').properties;

    if (!user) {
      return null;
    }

    return new User(user as unknown as User);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);

    return user !== null;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
