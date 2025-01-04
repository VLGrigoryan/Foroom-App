import JSZip from 'jszip';

const API_URL = 'http://api.foroom.ru/uploads/download/';

export async function fetchProductData(isFromZip = false) {
  const url = isFromZip ? `${API_URL}zip/data.zip` : `${API_URL}json/get_all_data.json`;

  try {
    if (isFromZip) {
      return await downloadAndExtractZip(url);
    } else {
      const response = await fetch(url);
      const result = await response.json();
      return result.status === 'OK' && result.data?.izd ? result.data.izd : [];
    }
  } catch (error) {
    console.error("Ошибка при получении данных о продуктах:", error);
    return [];
  }
}

function downloadAndExtractZip(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => JSZip.loadAsync(blob))
      .then(zip => {
        const jsonFileName = 'get_all_data.json';
        const file = zip.files[jsonFileName];
        if (file) {
          file.async('string')
            .then(jsonData => {
              const products = parseProductData(jsonData);
              resolve(products);
            })
            .catch(() => reject('Ошибка при извлечении содержимого файла.'));
        } else {
          reject('Файл "get_all_data.json" не найден в архиве.');
        }
      })
      .catch(() => reject('Ошибка при загрузке ZIP-архива.'));
  });
}

function parseProductData(jsonData) {
  try {
    const result = JSON.parse(jsonData);
    return result.status === 'OK' && result.data?.izd ? result.data.izd : [];
  } catch (error) {
    console.error("Ошибка при разборе JSON:", error);
    return [];
  }
}
