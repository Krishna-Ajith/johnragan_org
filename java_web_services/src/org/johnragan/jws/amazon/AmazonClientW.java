package org.johnragan.jws.amazon;

import java.util.List;

import javax.xml.ws.Holder;

import org.johnragan.awsClient.AWSECommerceService;
import org.johnragan.awsClient.AWSECommerceServicePortType;
import org.johnragan.awsClient.Item;
import org.johnragan.awsClient.ItemAttributes;
import org.johnragan.awsClient.ItemSearch;
import org.johnragan.awsClient.ItemSearchRequest;
import org.johnragan.awsClient.Items;
import org.johnragan.awsClient.OperationRequest;

public class AmazonClientW {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO - get key
		final String access_key = AmazonKeys.getAccessKey();
		AWSECommerceService service = new AWSECommerceService();
		service.setHandlerResolver(new AwsHandlerResolver(AmazonKeys.getSecretKey())); 
		AWSECommerceServicePortType port = service.getAWSECommerceServicePort();
		
		ItemSearchRequest request = new ItemSearchRequest();
		request.setSearchIndex("Books");
		request.setKeywords("quantum gravity");
		
		ItemSearch search = new ItemSearch();
		search.getRequest().add(request);
		search.setAWSAccessKeyId(access_key);
		
		Holder<OperationRequest> operation_request = null;
		Holder<List<Items>> items = new Holder<List<Items>>();
		
		port.itemSearch(search.getMarketplaceDomain(),
						search.getAWSAccessKeyId(),
						search.getSubscriptionId(),
						search.getAssociateTag(),
						search.getXMLEscaping(),
						search.getValidate(),
						search.getShared(),
						search.getRequest(),
						operation_request,
						items);
				
		// Unpack the response to print the book titles.
		Items retval = items.value.get(0);
		List<Item> item_list = retval.getItem();
		for (Item item : item_list) {
			ItemAttributes itemAttributes = (ItemAttributes)item.getContent().get(3);
			System.out.println(itemAttributes.getTitle());
		}
	}

}
