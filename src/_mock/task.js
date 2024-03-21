import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const tasks = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    brokerName: faker.name.fullName(),
    weight: "25ct",
    price: "452,321",
    kapanNo: "13",
    issueDate: "12/08/2021",
    returnDate: "21/08/2021",
    detail: "faker.lorem.paragraph()"
}));

// const tasks = [{
//     id: "faker.datatype.uuid()",
//     avatarUrl: `/assets/images/avatars/avatar_1}.jpg`,
//     brokerName: "faker.name.fullName()",
//     weight: "faker.random.numeric()",
//     price: "faker.random.numeric()",
//     kapanNo: "faker.random.numeric()",
//     issueDate: "faker.date.recent()",
//     returnDate: "faker.date.recent()",
//     detail: "faker.lorem.paragraph()"
// }]

export default tasks;
