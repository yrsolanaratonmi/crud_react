export interface CommentEntity {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string;
}

export interface HeadCell {
  id: keyof CommentEntity;
  label: string;
  numeric: boolean;
}
