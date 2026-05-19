import apiClient from './apiClient';

const SWITCH_LANG_URL =
  'https://www.tatd.in/app-api/driver/trusted-driver/switch-language-api.php';

export const switchLanguageApi = async (currentLanguage: 'english' | 'hindi') => {
  const response = await apiClient.post(
    SWITCH_LANG_URL,
    {
      action: 'update_language',
      current_language: currentLanguage,
    },
    {baseURL: ''},
  );
  return response.data;
};
