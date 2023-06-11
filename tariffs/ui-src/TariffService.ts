export class TariffService {
    public async getTariffs(): Promise<any> {
        const response = await fetch("http://localhost:4000/api/tariffs");
        return await response.json();
    }

    public async findBestTariff(userProfile: any): Promise<any> {
        const tariffs = await this.getTariffs();
        return tariffs.find((tarif: any) => {
            return tarif.ageFrom <= userProfile.age &&
                userProfile.age < tarif.ageTo;
        });
    }
}

