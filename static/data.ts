import { IOrder, IProduct } from "@/types/interfaces";

const url =
  "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/8e62ee66-8b44-4606-97c0-899b094baccc.jpg";

export const products: IProduct[] = [
  {
    $collectionId: "products",
    $createdAt: "2023-09-30T20:50:00.000Z",
    $databaseId: "63e8b5c5c4e4e4e4e4e4e4e4",
    $permissions: [],
    $updatedAt: "2023-09-30T20:50:00.000Z",
    $id: "as5s89e9f96f8r9asdaed89d8",
    name: "Product 1",
    price: "100",
    description: "This is product 1",
    category: {
      main: "men",
      sub: "clothing",
      child: "suits",
    },
    isActive: true,
    images: {
      main: url,
      subImages: [
        { imageId: url, imageTag: null },
        { imageId: url, imageTag: null },
      ],
    },
    filters: { size: ["S", "M", "L"] },
    features: {
      sleeveLength: "Normal",
      patterns: "Tək rəng",
    },
  },
  {
    $collectionId: "products",
    $createdAt: "2023-09-30T20:50:00.000Z",
    $databaseId: "63e8b5c5c4e4e4e4e4e4e4e4",
    $permissions: [],
    $updatedAt: "2023-09-30T20:50:00.000Z",

    $id: "as5s89e9f96f8r9asdae89rd7",
    name: "Product 2",
    price: "200",
    description: "This is product 2",
    category: {
      main: "men",
      sub: "clothing",
      child: "pants",
    },
    isActive: true,
    images: {
      main: url,
      subImages: [
        { imageId: url, imageTag: null },
        { imageId: url, imageTag: null },
      ],
    },
    filters: { size: ["S", "M", "L"] },
    features: {
      sleeveLength: "Normal",
      patterns: "Tək rəng",
    },
  },
  {
    $collectionId: "products",
    $createdAt: "2023-09-30T20:50:00.000Z",
    $databaseId: "63e8b5c5c4e4e4e4e4e4e4e4",
    $permissions: [],
    $updatedAt: "2023-09-30T20:50:00.000Z",

    $id: "as5s89e9f96f8r9asda6e8d9vh",
    name: "Product 3",
    price: "300",
    description: "This is product 3",
    category: {
      main: "women",
      sub: "clothing",
      child: "shirts",
    },
    isActive: true,
    images: {
      main: url,
      subImages: [
        { imageId: url, imageTag: "Qara" },
        { imageId: url, imageTag: null },
      ],
    },
    filters: { size: ["S", "M", "L"] },
    features: {
      sleeveLength: "Normal",
      patterns: "Tək rəng",
    },
  },
  {
    $collectionId: "products",
    $createdAt: "2023-09-30T20:50:00.000Z",
    $databaseId: "63e8b5c5c4e4e4e4e4e4e4e4",
    $permissions: [],
    $updatedAt: "2023-09-30T20:50:00.000Z",

    $id: "as5s89e9f96f8r9asda9e6d8f9",
    name: "Product 4",
    price: "400",
    description: "This is product 4",
    category: {
      main: "women",
      sub: "clothing",
      child: "pants",
    },
    isActive: true,
    images: {
      main: url,
      subImages: [
        { imageId: url, imageTag: null },
        { imageId: url, imageTag: null },
      ],
    },
    filters: { size: ["S", "M", "L"] },
    features: {
      sleeveLength: "Normal",
      patterns: "Tək rəng",
    },
  },
];

export const defaultOrders: IOrder[] = [
  {
    $id: "asd4asd45asdsad4",
    products: [
      {
        ...products[0],
        count: 2,
        selectedAtributes: { size: "M", color: "Qara" },
      },
      {
        ...products[1],
        count: 1,
        selectedAtributes: { size: "S", color: "Mavi" },
      },
      {
        ...products[2],
        count: 5,
        selectedAtributes: { size: "2xl", color: "Sarı" },
      },
      {
        ...products[3],
        count: 2,
        selectedAtributes: { size: "Xl", color: "Ağ" },
      },
      {
        ...products[2],
        count: 5,
        selectedAtributes: { size: "2xl", color: "Sarı" },
      },
      {
        ...products[3],
        count: 2,
        selectedAtributes: { size: "Xl", color: "Ağ" },
      },
    ],
    sellerNote: "asdasdsaasfafsad",
    createdAt: "2024-11-11T23:28:09.415Z",
    status: "pending",
  },
  {
    $id: "asd4asd45asdasda4",
    products: [
      {
        ...products[3],
        count: 2,
        selectedAtributes: { size: "Xl", color: "Ağ" },
      },
      {
        ...products[2],
        count: 5,
        selectedAtributes: { size: "2xl", color: "Sarı" },
      },
    ],
    sellerNote: "asdasdsaasfafsad",
    createdAt: "2024-11-11T23:28:09.415Z",
    status: "pending",
  },
  {
    $id: "asd4asd45aasda5e",
    products: [
      {
        ...products[3],
        count: 2,
        selectedAtributes: { size: "Xl", color: "Ağ" },
      },
      {
        ...products[2],
        count: 5,
        selectedAtributes: { size: "2xl", color: "Sarı" },
      },
    ],
    sellerNote: "asdasdsaasfafsad",
    createdAt: "2024-11-11T23:28:09.415Z",
    status: "pending",
  },
];
