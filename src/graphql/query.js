import { gql } from "@apollo/client";

export const getAllUsers = gql`
query GetAllUsers {
  getAllUsers {
    _id
    username
    email
    profilePicture
    location
    createdAt
  }
}
`;

export const getAllCategories = gql`
query GetAllCategories {
  getAllCategories {
    _id
    categoryName
  }
}
`;

export const getCategoriesById = gql`
query GetCategoryById($categoryId: ID) {
  getCategoryById(categoryId: $categoryId) {
    _id
    categoryName
  }
}
`;

export const getAllTags = gql`
query GetAllTags {
  getAllTags {
    _id
    tagName
  }
}
`;

export const getTagsById = gql`
query GetTagsById($tagId: ID) {
  getTagsById(tagId: $tagId) {
    _id
    tagName
  }
}
`;
