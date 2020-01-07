

const isClient=(cuser)=> cuser.role === "client";
const isAdmin=(cuser)=> cuser.role === "admin";

export { isClient , isAdmin}