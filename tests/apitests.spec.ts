import { test, expect } from "@playwright/test";
import { json } from "node:stream/consumers";
import postRequest from "../test-data/api-requests/post_request_body.json";
import tokenRequest from "../test-data/api-requests/token_request_body.json";


test.use({
    baseURL: process.env.API_BASE_URI,
});

test("End to End API testing using playwright", async ({ request }) => {

    let tokenNo = null;

    const postAPIResponse = await test.step('Create booking', async () => {
        return await request.post('https://restful-booker.onrender.com/booking', {
            data: postRequest,
        });
    });

    if (postAPIResponse.ok()) {
        try {
            const bookingId = await postAPIResponse.json();
            const bId = bookingId.bookingId;
            console.log('Success:', bookingId);
        } catch (err) {
            const bookingId = await postAPIResponse.text();
            console.error('JSON parsing error. Raw body:', bookingId);
        }
    } else {
        const errorBody = await postAPIResponse.text();
        console.error(`Request failed with status ${postAPIResponse.status()}:`, errorBody);
    }


    let getAPIResponse = await test.step('Get booking details', async () => {
        return await request.post('https://restful-booker.onrender.com/booking', {
            params: {
                firstName: "testers talk playwright",
                lastName: "testers talk api testing",
            },
        });
    });


    // await test.step("Validate status code", async () => {
    // console.log(await getAPIResponse.json());
    // expect(getAPIResponse.ok()).toBeTruthy();
    // expect(getAPIResponse.ok()).toBe(200);
    await test.step("Validate status code", async () => {
        const status = getAPIResponse.status();
        console.log('Status:', status);

        const responseText = await getAPIResponse.text(); // Use text() first to be safe
        console.log('Raw response body:', responseText);
        try {
            const responseJson = JSON.parse(responseText); // only if you're sure it's JSON
            console.log('JSON Response:', responseJson);
        } catch (err) {
            console.error('Failed to parse JSON. Raw response:', responseText);
        }
        expect(getAPIResponse.ok()).toBe(200);
    });


    const tokenAPIResponse = await test.step('Generate response & validate status code', async () => {
        return await request.post('https://restful-booker.onrender.com/auth', {
            data: tokenRequest,
        });

        expect(tokenAPIResponse.ok()).toBeTruthy();
        expect(tokenAPIResponse.ok()).toBe(200);


        console.log(await tokenAPIResponse.json());
        const tokenResponseBody = await tokenAPIResponse.json();
        tokenNo = tokenResponseBody.token;

    });


    const patchAPIResponse = await test.step('Partial update booking details & Validate status code', async () => {
        return await request.patch('/booking/${bId}', {
            headers: {
                "Content-Type": "application/json",
                Cookie: `token=${tokenNo}`,
            },
            data: {
                firstName: "testers talk postman",
                lastName: "testers talk rest assured",
            },
        });

        console.log(await patchAPIResponse.json());
        expect(patchAPIResponse.ok()).toBeTruthy();
        expect(patchAPIResponse.status()).toBe(200);
    });


    const deleteAPIResponse = await test.step('Delete booking & Validate status code', async () => {
        return await request.delete('/booking/${bId}', {
            headers: {
                "Content-Type": "application/json",
                Cookie: `token=${tokenNo}`,
            },
        });
        expect(deleteAPIResponse.status()).toBe(201);
        expect(deleteAPIResponse.statusText()).toBe("Created");
    });

});
