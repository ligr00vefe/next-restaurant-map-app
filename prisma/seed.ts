import * as data from '../src/data/restaurant_data.json';
import { prisma } from "../src/db"; 

async function seedData() {
	// seed 코드 작성
  data?.['DATA']?.map(async (store) => {
		const storeData = {
			phone: store?.cntct_tel,
			gugun: store?.gugun_nm,
			address: store?.addr1,
		  lat: store?.lat,
		  lng: store?.lng,
		  name: store?.main_title,
		  category: store?.bizcnd_code_nm || "",
		  menu: store?.rprsntv_menu || "",
		  description: store?.itemcntnts,
		};
		
		const result = await prisma.store.create({
			data: storeData
		});
		// console.log('seed result: ', result);
	});
}

async function main() {
	await seedData();
}

main()
	.catch((e) => {
		console.log('seed error: ', e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});