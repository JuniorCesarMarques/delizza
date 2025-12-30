

type AddressType = {
    street: string;
    number: string;
    neighborhood: string;
    cep?: string;
}

export default async function getCoords(address: AddressType) {

    const formatedAddress = `Rua ${address.street}, ${address.number}, Tatuí, SP, Brasil`;


    const res = await fetch(`/api/geocode?address=${formatedAddress}`)

    if(!res.ok) {
        return
    }

    const coords = await res.json();

    return coords;
}