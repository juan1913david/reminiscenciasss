import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // Importa el servicio de almacenamiento de Ionic

@Component({
  selector: 'app-home', // Selector que identifica el componente en el HTML
  templateUrl: 'home.page.html', // Ruta al archivo HTML del componente
  styleUrls: ['home.page.scss'], // Ruta al archivo de estilos CSS o SCSS del componente
})
export class HomePage {
  dataList: string[] = []; // Arreglo que almacena los datos ingresados
  newData: string = ''; // Variable que contiene el nuevo dato antes de agregarlo a la lista
  searchTerm: string = ''; // Variable que contiene el término de búsqueda

  constructor(private storage: Storage) {
    this.initStorage(); // Llama al método que inicializa el almacenamiento al crear el componente
  }
async addData() {
    // Agrega el nuevo dato a la lista
    this.dataList.push(this.newData);
    this.newData = ''; // Limpia el campo de texto para agregar nuevos datos
    await this.storage.set('dataList', this.dataList); // Almacena la lista de datos en el almacenamiento
  }

  async deleteData(index: number) {
    // Elimina el dato en la posición especificada de la lista
    this.dataList.splice(index, 1);
    await this.storage.set('dataList', this.dataList);
  }

  filteredDataList() {
    // Filtra la lista de datos según el término de búsqueda
    return this.dataList.filter((data) => {
      return data.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  async initStorage() {
    // Obtiene la lista de datos almacenadas en el almacenamiento
    const dataList = await this.storage.get('dataList');
    if (dataList) {
      this.dataList = dataList;
    }
  }   
  // Inicializa el almacenamiento
 
}
