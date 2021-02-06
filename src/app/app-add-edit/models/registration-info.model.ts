export class RegistrationInfoModule {
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    occupation: string;
    institutation: string;
    contactInfo: {
        phone: number;
        email: string;
    };
    address: {
        road: string;
        holding: string;
        post: string;
        postCode: number;
        district: string;
        city: string;
    };
}
