import { hash, compare } from 'bcryptjs';

export async function hashPassword(plainPassword) {
  return await hash(plainPassword, 12);
}

export async function comparePasswords(plainPassword, hashedPassword) {
  return await compare(plainPassword, hashedPassword);
}
