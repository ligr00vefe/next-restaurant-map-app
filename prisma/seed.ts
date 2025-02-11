import { PrismaClient } from '@prisma/client';
import * as data from '../src/data/restaurant_data.json';

const prisma = new PrismaClient();

async function seedData() {
	// seed 코드 작성
  data?.['DATA']?.map(async (store) => {
		const storeData = {
			phone: store?.cntct_tel,
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
		console.log(result);
	});
}

async function main() {
	await seedData();
}

main()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});