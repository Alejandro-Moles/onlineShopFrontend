import CategoriesService from '../services/categoriesService';
import PlatformsService from '../services/platformsService'
import CountryService from '../services/countryService'; 
import PostalCodeService from '../services/postalCodeService';
import ShopUserService from '../services/shopUserService';
import RoleService from '../services/roleService'
export const fetchCategories = async () => {
  try {
    const response = await CategoriesService.getCategories();
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchPlatforms = async () => {
  try {
    const response = await PlatformsService.getPlatforms();
    return response.data;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return [];
  }
};

export const fetchAvailableCategories = async () => {
  try {
    const response = await CategoriesService.getAvailableCategories();
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchAvailablePlatforms = async () => {
  try {
    const response = await PlatformsService.getAvailablePlatforms();
    return response.data;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const response = await CountryService.getCountries();
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const fetchAvailablePostalCode = async () => {
  try {
    const response = await PostalCodeService.getAvailablePostalCode();
    return response.data;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return [];
  }
};

export const fetchShopUsers = async () => {
  try {
    const response = await ShopUserService.getShopUsers();
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const fetchRoles = async () => {
  try {
    const response = await RoleService.getRoles();
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};