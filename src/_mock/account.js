// import { useSelector } from 'react-redux';

// const Account = () => {
//   const storeData = useSelector((state) => state);

//   const account = {
//     username: Object.keys(storeData?.employee).length === 0 ? storeData?.company?.ownerName : storeData?.employee?.emName,
//     companyName: storeData?.company?.companyName ?? 'Not Found',
//     email: storeData?.employee ? storeData?.employee?.emEmail : storeData?.company?.email,
//     photoURL: '/assets/images/avatars/avatar_default.jpg',
//   };

//   console.log('----------------', { store: storeData, account, name: storeData?.company?.ownerName });

//   return account;
// };

// export default Account;


import store from 'src/store/store';

export const storeData = store.getState();

// const account = {
//   username: storeData?.employee === {} ? storeData?.company?.ownerName : storeData?.employee?.emName,
//   companyName: storeData?.company?.companyName ?? 'Not Found',
//   email: storeData?.employee ? storeData?.employee?.emEmail : storeData?.company?.email,
//   photoURL: '/assets/images/avatars/avatar_default.jpg',
// };

const account = {
  username: Object.keys(storeData?.employee).length === 0 ? 'Admin ' + storeData?.company?.ownerName : storeData?.employee?.emName,
  companyName: storeData?.company?.cmName ?? 'Not Found',
  email: storeData?.employee ? storeData?.employee?.emEmail : storeData?.company?.email,
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

console.log('----------------', storeData)
console.log(Object.keys(storeData?.employee).length)
export default account

