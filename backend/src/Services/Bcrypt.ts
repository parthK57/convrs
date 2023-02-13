import bcrypt from "bcrypt";

export const Encrypter = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const Decrypter = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}
