import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Neo4jService } from 'nest-neo4j/dist';
import { GraphQLDeleteResult } from 'src/common/graphql/types/delete-result.graphql.type';
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

    return new User(user);
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

    return new User(user);
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

    return new User(user);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);

    return user !== null;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    if (updateUserInput.password) {
      updateUserInput.password = await hash(
        updateUserInput.password,
        Config.PASSWORD_HASH_ROUNDS,
      );
    }

    const result = await this.neo4jService.write(
      `
      MATCH (u:User { id: $id })
      SET u += {
        name: $name,
        email: $email,
        password: $password,
        updatedAt: datetime()
      }
      RETURN u
      `,
      {
        id,
        name: updateUserInput.name ?? user.name,
        email: updateUserInput.email ?? user.email,
        password: updateUserInput.password ?? user.password,
      },
    );

    const newUser = result.records.at(0)?.get('u').properties;

    if (!newUser) {
      throw new InternalServerErrorException();
    }

    return new User(newUser);
  }

  async remove(id: string): Promise<GraphQLDeleteResult> {
    let success = true;

    try {
      await this.neo4jService.write(
        `
        MATCH (u:User { id: $id })
        DELETE u
        `,
        { id },
      );
    } catch {
      success = false;
    }

    return new GraphQLDeleteResult({ success });
  }
}
