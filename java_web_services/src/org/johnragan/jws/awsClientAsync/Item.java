
package org.johnragan.jws.awsClientAsync;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ASIN" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="ParentASIN" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Errors" minOccurs="0"/>
 *         &lt;element name="DetailPageURL" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}ItemLinks" minOccurs="0"/>
 *         &lt;element name="SalesRank" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="SmallImage" type="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Image" minOccurs="0"/>
 *         &lt;element name="MediumImage" type="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Image" minOccurs="0"/>
 *         &lt;element name="LargeImage" type="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Image" minOccurs="0"/>
 *         &lt;element name="ImageSets" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="MerchantId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}ImageSet" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}ItemAttributes" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}MerchantItemAttributes" minOccurs="0"/>
 *         &lt;element name="VariationAttributes" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}VariationAttribute" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}OfferSummary" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}RelatedItems" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Collections" minOccurs="0"/>
 *         &lt;element name="Subjects" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="Subject" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}OfferSummary" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Offers" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}VariationSummary" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Variations" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}CustomerReviews" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}EditorialReviews" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}SimilarProducts" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Accessories" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Tracks" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}BrowseNodes" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}Tags" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}ListmaniaLists" minOccurs="0"/>
 *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}SearchInside" minOccurs="0"/>
 *         &lt;element name="AlternateVersions" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="AlternateVersion" maxOccurs="unbounded" minOccurs="0">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence>
 *                             &lt;element name="ASIN" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                             &lt;element name="Title" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                             &lt;element name="Binding" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "content"
})
@XmlRootElement(name = "Item")
public class Item {

    @XmlElementRefs({
        @XmlElementRef(name = "Accessories", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = Accessories.class),
        @XmlElementRef(name = "ItemLinks", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = ItemLinks.class),
        @XmlElementRef(name = "Tracks", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = Tracks.class),
        @XmlElementRef(name = "BrowseNodes", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = BrowseNodes.class),
        @XmlElementRef(name = "Errors", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = Errors.class),
        @XmlElementRef(name = "EditorialReviews", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = EditorialReviews.class),
        @XmlElementRef(name = "ASIN", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "SalesRank", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "Tags", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = Tags.class),
        @XmlElementRef(name = "ParentASIN", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "CustomerReviews", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = CustomerReviews.class),
        @XmlElementRef(name = "Offers", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = Offers.class),
        @XmlElementRef(name = "RelatedItems", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = RelatedItems.class),
        @XmlElementRef(name = "ListmaniaLists", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = ListmaniaLists.class),
        @XmlElementRef(name = "DetailPageURL", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "OfferSummary", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = OfferSummary.class),
        @XmlElementRef(name = "MediumImage", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "AlternateVersions", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "VariationSummary", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = VariationSummary.class),
        @XmlElementRef(name = "MerchantItemAttributes", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = MerchantItemAttributes.class),
        @XmlElementRef(name = "SimilarProducts", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = SimilarProducts.class),
        @XmlElementRef(name = "Collections", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = Collections.class),
        @XmlElementRef(name = "Subjects", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "LargeImage", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "Variations", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = Variations.class),
        @XmlElementRef(name = "ItemAttributes", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = ItemAttributes.class),
        @XmlElementRef(name = "SearchInside", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = SearchInside.class),
        @XmlElementRef(name = "SmallImage", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "VariationAttributes", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class),
        @XmlElementRef(name = "ImageSets", namespace = "http://webservices.amazon.com/AWSECommerceService/2009-11-01", type = JAXBElement.class)
    })
    protected List<Object> content;

    /**
     * Gets the rest of the content model. 
     * 
     * <p>
     * You are getting this "catch-all" property because of the following reason: 
     * The field name "OfferSummary" is used by two different parts of a schema. See: 
     * line 1425 of http://ecs.amazonaws.com/AWSECommerceService/AWSECommerceService.wsdl
     * line 1413 of http://ecs.amazonaws.com/AWSECommerceService/AWSECommerceService.wsdl
     * <p>
     * To get rid of this property, apply a property customization to one 
     * of both of the following declarations to change their names: 
     * Gets the value of the content property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the content property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getContent().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Accessories }
     * {@link ItemLinks }
     * {@link Tracks }
     * {@link BrowseNodes }
     * {@link Errors }
     * {@link EditorialReviews }
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link Tags }
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link CustomerReviews }
     * {@link Offers }
     * {@link RelatedItems }
     * {@link ListmaniaLists }
     * {@link JAXBElement }{@code <}{@link String }{@code >}
     * {@link OfferSummary }
     * {@link JAXBElement }{@code <}{@link Image }{@code >}
     * {@link JAXBElement }{@code <}{@link Item.AlternateVersions }{@code >}
     * {@link VariationSummary }
     * {@link MerchantItemAttributes }
     * {@link SimilarProducts }
     * {@link Collections }
     * {@link JAXBElement }{@code <}{@link Item.Subjects }{@code >}
     * {@link JAXBElement }{@code <}{@link Image }{@code >}
     * {@link Variations }
     * {@link ItemAttributes }
     * {@link SearchInside }
     * {@link JAXBElement }{@code <}{@link Image }{@code >}
     * {@link JAXBElement }{@code <}{@link Item.VariationAttributes }{@code >}
     * {@link JAXBElement }{@code <}{@link Item.ImageSets }{@code >}
     * 
     * 
     */
    public List<Object> getContent() {
        if (content == null) {
            content = new ArrayList<Object>();
        }
        return this.content;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="AlternateVersion" maxOccurs="unbounded" minOccurs="0">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence>
     *                   &lt;element name="ASIN" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *                   &lt;element name="Title" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                   &lt;element name="Binding" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "alternateVersion"
    })
    public static class AlternateVersions {

        @XmlElement(name = "AlternateVersion")
        protected List<Item.AlternateVersions.AlternateVersion> alternateVersion;

        /**
         * Gets the value of the alternateVersion property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the alternateVersion property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getAlternateVersion().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link Item.AlternateVersions.AlternateVersion }
         * 
         * 
         */
        public List<Item.AlternateVersions.AlternateVersion> getAlternateVersion() {
            if (alternateVersion == null) {
                alternateVersion = new ArrayList<Item.AlternateVersions.AlternateVersion>();
            }
            return this.alternateVersion;
        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType>
         *   &lt;complexContent>
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
         *       &lt;sequence>
         *         &lt;element name="ASIN" type="{http://www.w3.org/2001/XMLSchema}string"/>
         *         &lt;element name="Title" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *         &lt;element name="Binding" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
         *       &lt;/sequence>
         *     &lt;/restriction>
         *   &lt;/complexContent>
         * &lt;/complexType>
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "", propOrder = {
            "asin",
            "title",
            "binding"
        })
        public static class AlternateVersion {

            @XmlElement(name = "ASIN", required = true)
            protected String asin;
            @XmlElement(name = "Title")
            protected String title;
            @XmlElement(name = "Binding")
            protected String binding;

            /**
             * Gets the value of the asin property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getASIN() {
                return asin;
            }

            /**
             * Sets the value of the asin property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setASIN(String value) {
                this.asin = value;
            }

            /**
             * Gets the value of the title property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getTitle() {
                return title;
            }

            /**
             * Sets the value of the title property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setTitle(String value) {
                this.title = value;
            }

            /**
             * Gets the value of the binding property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getBinding() {
                return binding;
            }

            /**
             * Sets the value of the binding property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setBinding(String value) {
                this.binding = value;
            }

        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="MerchantId" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}ImageSet" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "merchantId",
        "imageSet"
    })
    public static class ImageSets {

        @XmlElement(name = "MerchantId")
        protected String merchantId;
        @XmlElement(name = "ImageSet")
        protected List<ImageSet> imageSet;

        /**
         * Gets the value of the merchantId property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getMerchantId() {
            return merchantId;
        }

        /**
         * Sets the value of the merchantId property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setMerchantId(String value) {
            this.merchantId = value;
        }

        /**
         * Gets the value of the imageSet property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the imageSet property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getImageSet().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link ImageSet }
         * 
         * 
         */
        public List<ImageSet> getImageSet() {
            if (imageSet == null) {
                imageSet = new ArrayList<ImageSet>();
            }
            return this.imageSet;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="Subject" type="{http://www.w3.org/2001/XMLSchema}string" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "subject"
    })
    public static class Subjects {

        @XmlElement(name = "Subject")
        protected List<String> subject;

        /**
         * Gets the value of the subject property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the subject property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getSubject().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         * 
         * 
         */
        public List<String> getSubject() {
            if (subject == null) {
                subject = new ArrayList<String>();
            }
            return this.subject;
        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element ref="{http://webservices.amazon.com/AWSECommerceService/2009-11-01}VariationAttribute" maxOccurs="unbounded" minOccurs="0"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "variationAttribute"
    })
    public static class VariationAttributes {

        @XmlElement(name = "VariationAttribute")
        protected List<VariationAttribute> variationAttribute;

        /**
         * Gets the value of the variationAttribute property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the variationAttribute property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getVariationAttribute().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link VariationAttribute }
         * 
         * 
         */
        public List<VariationAttribute> getVariationAttribute() {
            if (variationAttribute == null) {
                variationAttribute = new ArrayList<VariationAttribute>();
            }
            return this.variationAttribute;
        }

    }

}
