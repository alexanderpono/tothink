import { UserProfileDto } from "./UserProfileDto";

export class UserProfileRepository {
    public async getUserProfile(): Promise<UserProfileDto> {
        const response = await fetch("http://localhost:4000/api/profile");
        const object = await response.json();
        return new UserProfileDto().fromJSON(object);
    }
}