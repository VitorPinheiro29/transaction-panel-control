import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  encryptLocalKey: any = '';
  keyEncrypted: any;
  hasSameKeyEncrypted: any;
  getSameKey: any;

  private _encryptKey: string = 'a7fd5ddbc7137790f3b61549ea14ed54';

  get(key: any) {
    try {
      let re = /"/gi;
      this.decryptKey(key);
      const valueDecrypted = localStorage.getItem(this.encryptLocalKey);
      return this.decryptData(valueDecrypted);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  set(key: string, data: any): void {
    try {
      this.encryptKey(key);
      const valueEncrypted = this.encryptData(data);
      localStorage.setItem(this.keyEncrypted, valueEncrypted);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error deleting to localStorage', e);
    }
  }

  private encryptKey(key) {

    if (localStorage.length == 0) {
      this.keyEncrypted = this.encryptKey2(key);
    } else {
      this.hasSameKeyEncrypted = 0;
      for (let i = 0; i < localStorage.length; i++) {
        let re = /"/gi;
        let localStorageKey = localStorage.key(i);
        if (key == this.decryptData(localStorageKey).replace(re, '')) {
          this.hasSameKeyEncrypted = this.hasSameKeyEncrypted + 1; 
          this.getSameKey = localStorage.key(i);
          break;
        } 
      }

    if (this.hasSameKeyEncrypted == 0) {
      this.keyEncrypted = this.encryptKey2(key);
    } else {
      this.keyEncrypted = this.getSameKey;
    }
  }}

  private encryptKey2(key) {
    return CryptoJS.AES.encrypt(JSON.stringify(key), this._encryptKey,
      {
        keySize: 128 / 8,
        iv: this._encryptKey,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
  }

  private encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this._encryptKey,
      {
        keySize: 128 / 8,
        iv: this._encryptKey,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
  }

  private decryptKey(key: any) {
    let re = /"/gi;
    
    if (localStorage.length > 0) {
      this.encryptLocalKey = '';
      for (let i = 0; i < localStorage.length; i++) {
        let localStorageKeyDescripted = this.decryptData(localStorage.key(i));
        if (key == localStorageKeyDescripted.replace(re, '')) {
          this.encryptLocalKey = localStorage.key(i);
        }
      } 
      if (this.encryptLocalKey == '') {
        return null;
      }
    } else { 
      return null; 
    }
  } 

  private decryptData(data) {
    try {
      if (!data) {
        return null;
      } 
      const bytes = CryptoJS.AES.decrypt(data, this._encryptKey);

      if (data != null) {  
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
      }

      return data;
      
    } catch (e) {
      throw 'Encrypt invalid!'
    }
  }
}
