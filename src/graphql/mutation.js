import { gql } from "@apollo/client";

export const insertUser = gql`
mutation RegisterUser($userDetails: userData) {
  registerUser(userDetails: $userDetails) {
    username
    email
    password
    profilePicture
    location
    createdAt
    token
  }
}
`;

export const loginUser = gql`
mutation LoginUser($userCred: userCred) {
  loginUser(userCred: $userCred) {
    username
    email
    password
    profilePicture
    location
    createdAt
    token
  }
}
`;

export const deleteUserById = gql`
mutation DeleteUserById($userId: ID) {
  deleteUserById(userId: $userId)
}
`;

export const insertCategory = gql`
mutation InsertCategory($categoryDetails: categoryData) {
  insertCategory(categoryDetails: $categoryDetails) {
    categoryName
  }
}
`;

export const updateCategory = gql`
mutation UpdateCategory($categoryId: ID, $categoryDetails: categoryData) {
  updateCategory(categoryId: $categoryId, categoryDetails: $categoryDetails) {
    _id
    categoryName
  }
}
`;

export const deleteCategory = gql`
mutation DeleteCategory($categoryId: ID) {
  deleteCategory(categoryId: $categoryId)
}
`;

export const insertTags = gql`
mutation InsertTags($tagsDetails: tagsData) {
  insertTags(tagsDetails: $tagsDetails) {
    tagName
  }
}
`;

export const updateTags = gql`
mutation UpdateTags($tagId: ID, $tagsDetails: tagsData) {
  updateTags(tagId: $tagId, tagsDetails: $tagsDetails) {
    _id
    tagName
  }
}
`;

export const deleteTag = gql`
mutation DeleteTag($tagId: ID) {
  deleteTag(tagId: $tagId)
}
`;