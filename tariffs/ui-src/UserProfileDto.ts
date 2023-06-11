export class UserProfileDto { // <-- модель с описанием данных и логикой
    public firstName: string | null = null;
    public lastName: string | null = null;
    public birthdate: Date | null = null;

    public getAge(): number {
        if (this.birthdate) {
            const ageDifMs = Date.now() - this.birthdate.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        return 0;
    }

    public getFullname(): string | null {
        return [
            this.firstName ?? "",
            this.lastName ?? ""
        ]
            .join(" ")
            .trim() || null;
    }

}
