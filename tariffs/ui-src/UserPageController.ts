export class UserPageController {

    public userProfile: any = {};
    public insuranceCases: any[] = [];
    public tariffs: any[] = [];
    public bestTariff: any = {};

    constructor() {
        this.activate();
    }

    public activate(): void {
        this.requestUserProfile();
        this.requestTariffs();
    }

    public async requestUserProfile(): Promise<void> { // получение данных
        try {
            const response = await fetch("http://localhost:4000/api/profile");
            this.userProfile = await response.json();
            this.findBestTariff();
        } catch (e) {
            console.error(e);
        }
    }

    public async requestTariffs(): Promise<void> { // получение данных
        try {
            const response = await fetch("http://localhost:4000/api/tariffs");
            this.tariffs = await response.json();
            this.findBestTariff();
        } catch (e) {
            console.error(e);
        }
    }

    public findBestTariff(): void { // метод с бизнес логикой
        if (this.userProfile && this.tariffs) {
            this.bestTariff = this.tariffs.find((tarif: any) => {
                return tarif.ageFrom <= this.userProfile.age && this.userProfile.age < tarif.ageTo;
            });
        }
        console.log('findBestTariff() this.bestTariff=', this.bestTariff);
    }
}
