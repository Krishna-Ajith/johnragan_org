package org.johnragan.jws.amazon;

import java.util.List;
import java.util.concurrent.ExecutionException;

import javax.xml.ws.AsyncHandler;
import javax.xml.ws.Response;

import org.johnragan.jws.awsClientAsync.AWSECommerceService;
import org.johnragan.jws.awsClientAsync.AWSECommerceServicePortType;
import org.johnragan.jws.awsClientAsync.Item;
import org.johnragan.jws.awsClientAsync.ItemAttributes;
import org.johnragan.jws.awsClientAsync.ItemSearch;
import org.johnragan.jws.awsClientAsync.ItemSearchRequest;
import org.johnragan.jws.awsClientAsync.ItemSearchResponse;
import org.johnragan.jws.awsClientAsync.Items;

/*
 * wsimport -keep -p org.johnragan.jws.awsClientAsync http://ecs.amazonaws.com/AWSECommerceService/AWSECommerceService.wsdl -b customAsync.xml .
 * 
 */

public class AmazonClientAsync {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO - get key
		final String access_key = "AKIAJPTPYX5V7PGLR74Q";
		AWSECommerceService service = new AWSECommerceService();
		service.setHandlerResolver(new AwsHandlerResolver("fzlG2kVEn7Eb8NcwF6pLIociFpg0y59DJmRTrmYL")); 
		AWSECommerceServicePortType port = service.getAWSECommerceServicePort();
		
		ItemSearchRequest request = new ItemSearchRequest();
		request.setSearchIndex("Books");
		request.setKeywords("quantum gravity");
		
		ItemSearch itemSearch = new ItemSearch();
		//itemSearch.getRequest().add(request);
		itemSearch.setAWSAccessKeyId(access_key);
		itemSearch.getRequest().add(request);
		
		port.itemSearchAsync(itemSearch, new MyHandler());
		
		try {
			Thread.sleep(5000);
		}
		catch (InterruptedException e) { System.err.println(e); }
	}

	static class MyHandler implements AsyncHandler<ItemSearchResponse> {
		@Override
		public void handleResponse(Response<ItemSearchResponse> future) {
			try {
				ItemSearchResponse response = future.get();
				List<Items> item_list = response.getItems();
				for (Items next : item_list) {
					for (Item item : next.getItem()) {
						ItemAttributes itemAttributes = (ItemAttributes)item.getContent().get(3);
						System.out.println(itemAttributes.getTitle());
					}
				}
			}
			catch (InterruptedException e) { System.err.println(e); }
			catch(ExecutionException e) { System.err.println(e); }
		}
		
	}
}
