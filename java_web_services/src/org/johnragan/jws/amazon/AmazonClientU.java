package org.johnragan.jws.amazon;

import java.util.List;

import javax.xml.ws.Holder;

import org.johnragan.jws.awsClient2.AWSECommerceService;
import org.johnragan.jws.awsClient2.AWSECommerceServicePortType;
import org.johnragan.jws.awsClient2.Item;
import org.johnragan.jws.awsClient2.ItemAttributes;
import org.johnragan.jws.awsClient2.ItemSearch;
import org.johnragan.jws.awsClient2.ItemSearchRequest;
import org.johnragan.jws.awsClient2.ItemSearchResponse;
import org.johnragan.jws.awsClient2.Items;
import org.johnragan.jws.awsClient2.OperationRequest;

public class AmazonClientU {

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
		
//		Holder<OperationRequest> operation_request = null;
//		Holder<List<Items>> items = new Holder<List<Items>>();
		
		ItemSearchResponse response = port.itemSearch(itemSearch);
		
//		port.itemSearch(search.getMarketplaceDomain(),
//						search.getAWSAccessKeyId(),
//						search.getSubscriptionId(),
//						search.getAssociateTag(),
//						search.getXMLEscaping(),
//						search.getValidate(),
//						search.getShared(),
//						search.getRequest(),
//						operation_request,
//						items);
				
		// Unpack the response to print the book titles.
		List<Items> item_list = response.getItems();
		for (Items next: item_list) {
			for (Item item : next.getItem()) {
				ItemAttributes itemAttributes = (ItemAttributes)item.getContent().get(3);
				System.out.println(itemAttributes.getTitle());
			}
		}
	}

}