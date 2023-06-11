export class UserProfileRepository {
    public async getUserProfile(): Promise<any> {
        const response = await fetch("http://localhost:4000/api/profile");
        return await response.json();
    }
}