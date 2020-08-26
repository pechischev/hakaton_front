import { IType } from "./index";
import { ISpecialization } from "../specialization";

export const typesMock: IType[] = [
    {id: 1, title: "Автолавка", icon: "islands#blueAutoCircleIcon"},
    {id: 2, title: "Автоцистерна", icon: "islands#blueDeliveryCircleIcon"},
    {id: 3, title: "Бахчевой развал", icon: "islands#blueGardenCircleIcon"},
    {id: 4, title: "Елочный развал", icon: "islands#blueVegetationCircleIcon"},
    {id: 5, title: "Киоск", icon: "islands#blueLeisureCircleIcon"},
    {id: 6, title: "Торговая галерея", icon: "islands#blueLeisureCircleIcon"},
    {id: 7, title: "Торговая палатка", icon: "islands#blueCircusCircleIcon"},
    {id: 8, title: "Торговая тележка", icon: "islands#blueShoppingCircleIcon"},
    {id: 9, title: "Торговый автомат", icon: "islands#blueNightClubCircleIcon"},
    {id: 10, title: "Торговый автомат (вендинговый автомат)", icon: "islands#blueLaundryCircleIcon"},
    {id: 11, title: "Торговый автофургон", icon: "islands#blueRailwayCircleIcon"},
    {id: 12, title: "Торговый павильон", icon: "islands#blueHomeCircleIcon"}
];

export const specializationsMock: ISpecialization[] = [
    {id: 1, title: "Непродовольственные товары", colour: "#76b5bb"},
    {id: 2, title: "Продовольственные товары (мороженное и замороженные десерты)", colour: "#a580d3"},
    {id: 3, title: "Непродовольственные товары (печатная продукция, пресса)", colour: "#d38097"},
    {id: 4, title: "Непродовольственные товары (цветы срезанные и бутоны цветочные)", colour: "#b87e7e"},
    {id: 5, title: "Продовольственные и непродовольственные товары", colour: "#87bb76"},
    {id: 6, title: "Продовольственные товары", colour: "#e8b05d"}
];