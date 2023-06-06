export interface CommentEntity {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string;
}

export interface PostEntity {
  userId: number,
  id: number,
  title: string,
  body: string
}

interface UserGeo {
  lat: string,
  lng: string
}
interface UserAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: UserGeo
}
interface UserCompany {
  name: string,
  catchPhrase: string,
  bs: string
}

export interface UserEntity {
  id: number,
  name: string,
  username: string,
  email: string,
  address: UserAddress,
  phone: string;
  website: string,
  company: UserCompany
}