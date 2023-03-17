import { Lead } from './lead.entity';

describe('Lead Entity', () => {
  it('should create a lead', () => {
    let lead = new Lead();

    lead = {
      _id: '123',
      cnpj: '52437879000137',
      email: 'teste@lead.com',
      legalNature: '1',
      uuid: '',
      companySize: '',
      annualRevenue: '',
      legalName: '',
      fantasyName: '',
      biometricDocument: '',
      documents: [
        {
          name: '',
          status: '',
        },
      ],
      address: [
        {
          zipcode: '',
          country: '',
          city: '',
          uf: '',
          street: '',
          number: '',
          district: '',
          complement: '',
        },
      ],
      associate: [
        {
          cpf: '',
          fullName: '',
          socialName: '',
          birthDate: '',
          phone: '',
          motherName: '',
          occupation: '',
          monthlyIncome: '',
          pepLevel: '',
          address: [
            {
              zipcode: '',
              country: '',
              city: '',
              uf: '',
              street: '',
              number: '',
              district: '',
              complement: '',
            },
          ],
        },
      ],
      registerStatus: '',
      registerStatusHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(lead.cnpj).toBe('52437879000137');
    expect(lead.email).toBe('teste@lead.com');
    expect(lead.companySize).toBe('');
  });
});
