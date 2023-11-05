import CategoriesService from '../services/categoriesService'; 
import PlatformsService from '../services/platformsService'; 
import CountryService from '../services/countryService'; 

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

export const fetchCountries = async () => {
  try {
    const response = await CountryService.getCountries();
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
