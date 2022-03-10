import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfMake/build/pdfmake'; 
import pdfFonts from 'pdfMake/build/vfs_fonts'; 
import { HttpClient } from '@angular/common/http';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew Italic.ttf',
    bolditalics: 'THSarabunNew BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {

  public viewbill:any = [];
  public viewodt:any = [];
  orderID: string;
  id: string;
  start: any;
  datastorage :any;

  empName;
  tableNumber;
  promoName;

  base64Image = null;
  logoData = null;

  pdfObj = null;
  
  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,private modelCtrl: ModalController,
    private plt: Platform,private file: File,private fileOpener: FileOpener,
    private http: HttpClient) { }

  ngOnInit() {
    // this.orderID = this.actRoute.snapshot.paramMap.get('orderID');
    console.log(this.orderID);
    this.loadLocalAssetToBase64();
    
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.loadbill();
    this.loadODT();
  }

  loadbill(){
    this.viewbill = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'Show_bill',
        orderID: this.orderID,
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        for(let datas of res.arr){
           this.viewbill.push(datas);
        }
        this.empName = res.user.empName;
        this.tableNumber = res.table.tableNumber;
        this.promoName = res.promo.promoName;
         resolue(true);
       console.log(res);
     });
   });
}

loadODT(){
  return new Promise(resolue => {
    let body = {
      aksi: 'show_orderdetail',
      orderID: this.orderID,
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
       for(let datas of res){
          this.viewodt.push(datas);
       }
        resolue(true);
      console.log(res);
    });
  });
}

getChange() {
  return this.viewbill.reduce((i, j) => i + j.billReceive - j.billTotal ,0);
}

close(a) {
  this.modelCtrl.dismiss();
  console.log("ขอดูข้างในหน่อย = "+a[0]);
  
  this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab2/' +this.id]);
}

loadLocalAssetToBase64() {
  this.http.get('./assets/icon/logo-pizza-garden.png', { responseType: 'blob'})
  .subscribe(res => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.logoData = reader.result;
    }
    reader.readAsDataURL(res);
  });
}

createPdf(a) {
  let logo = {};

    console.log(this.viewodt);
    
    logo = { image: this.logoData, width: 70 , alignment: 'left'};
    let odt_amount ="";
    let foodName ="";
    let price ="";
    let datePDF = "";
    let ReceivePDF = "";
    let ChangePDF = "";
    let Cash = "";
    let Change = "";
    let Baht = "";
    // for(let i = 0 ; i < this.viewodt.length ; i++){
    //   incol.push(this.viewodt[i]);
    // }
    
    // incol = this.viewodt;
    console.log("asdf");
    for(let i = 0 ; i < this.viewodt.length ; i++){
      // odt_amount += this.viewodt[i].odt_amount+"x "+this.viewodt[i].foodName+"   "+b[i].price+'\n';
       console.log(i);
       odt_amount += this.viewodt[i].getAmountTotal+"x"+'\n'
       foodName += this.viewodt[i].foodName+'\n'
       price += this.viewodt[i].price+'\n'
    }

    if(a[0].payment == 'เงินสด'){
      datePDF = a[0].billDate;
      ReceivePDF = a[0].billReceive;
      ChangePDF = this.getChange();
      Cash = 'Cash';
      Change = 'Change';
      Baht = 'บาท';
    }
    
    var docDefinition = {
      content: [
         
       logo ,

   
        { text: 'PIZZA GARDEN', style: 'header', margin: [ 106, -20, 0, 10 ]},
        
        {
          style: 'date',
            columns: [
                {
                  text: [
                          datePDF,
                        ], 
                        style: 'date', alignment: 'left' 
                },
                {
                  text: [
                          'ผู้รับรายการ ',
                          this.empName,
                        ], 
                        style: 'date', alignment: 'right'
                }
              ]
        },
        { text: 
          [
                'เลขใบเสร็จ ',
                a[0].billID,
          ], 
          style: 'date' , alignment: 'right'
                
        },
        { text: 
          [
            'โต๊ะ ',
            this.tableNumber,
          ], 
          style: 'date' , alignment: 'right'
                
        },
        { text: 
          [
            'ประเภท ',
            a[0].payment,
          ], 
          style: 'date' , alignment: 'right'
                
        },
        // { text: 
        //   [
        //     this.promoName,
        //   ], 
        //   style: 'date' , alignment: 'right'
                
        // },

        {
          style: 'date',
            columns: [
               {
                  text: [
                          'Order #',
                          a[0].orderID,
                        ], 
                        style: 'subheader',alignment: 'center'
                },
              ]
        },

        {
          style: 'list',
            columns: [
              
                {
                  text: 'จำนวน', alignment: 'left'
                },
                {
                  text: 'รายการ', alignment: 'center'
                },  
                {
                  text: 'ราคา', alignment: 'right'
                }
                    ]
        },

        {
          columns: [
              {
                text: [
                      '__________________________________________'
                      ], 
                      margin: [ 0, -10, 0, 5 ]
              }
            ]
      },
        
        {
          style: 'date',
            columns: [
              
                {
                  text: odt_amount, alignment: 'left'
                },
                {
                  text: foodName, alignment: 'center'
                },  
                {
                  text: price, alignment: 'right'
                }
                    ]
        },

        {
          columns: [
              {
                text: [
                      '__________________________________________'
                      ], 
                      margin: [ 0, -5, 0, 0 ]
              }
            ]
      },
      {
        columns: [
            {
              text: [
                    'Subtotal '
                    ], 
                style: 'date',alignment: 'left'
            },
            {
              text: [
                    a[0].bill,
                    ' บาท'
                    ], 
                  style: 'date',alignment: 'right'
            }
          ]
      },
      {
        columns: [
            {
              text: [
                      this.promoName,
                    ], 
                style: 'date',alignment: 'left'
            },
            {
              text: [
                    a[0].billdiscount,
                    ' บาท'
                    ], 
                  style: 'date',alignment: 'right'
            }
          ]
      },
      {
          columns: [
              {
                text: [
                      'Total '
                      ], 
                  style: 'change',alignment: 'left'
              },
              {
                text: [
                      a[0].billTotal,
                      ' บาท'
                      ], 
                    style: 'change',alignment: 'right'
              }
            ]
      },
      {
        columns: [
            {
              text: [
                    Cash, 
                    ], 
                style: 'date',alignment: 'left'
            },
            {
              text: [
                      ReceivePDF,
                      Baht,
                    ], 
                  style: 'date',alignment: 'right'
            }
          ]
    },
    {
      columns: [
          {
            text: [
                    Change,
                  ], 
              style: 'change',alignment: 'left'
          },
          {
            text: [
                  ChangePDF,
                    Baht,
                  ], 
                style: 'change',alignment: 'right'
          }
        ]
  },

      ],
      styles: {

        defaultStyle: {
          font: 'THSarabunNew',
          fontSize: 12,
          alignment: 'center',
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },  
        change: {
          font: 'THSarabunNew',
          fontSize: 16,
          bold: true,
        },
        header: {
          fontSize: 16,
          bold: true,
          color: 'orange',
        },
        subheader: {
          font: 'THSarabunNew',
          fontSize: 16,
          bold: true,
        },
        date: {
          font: 'THSarabunNew',
          fontSize: 14,
        },
        list: {
          font: 'THSarabunNew',
          fontSize: 14,
          bold: true,
        },
        story: {
          font: 'THSarabunNew',
          italic: true,
          alignment: 'center',
          width: '50%',
        },
      },
      pageSize: 'A6',
      pageOrientation: 'portrait',
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

  if (this.plt.is('cordova')) {
    this.pdfObj.getBuffer((buffer) => {
      var utf8 = new Uint8Array(buffer);
      var binaryArray = utf8.buffer;
      var blob = new Blob([binaryArray], { type: 'application/pdf' });

    //   // Save the PDF to the data Directory of our App
      this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
    //     // Open the PDf with the correct OS tools
        this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
      })
    });
  } else {
    // On a browser simply use download!
    this.pdfObj.download();
  }
}

}
