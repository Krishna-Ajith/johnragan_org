package chapter5.hibernate;

import org.springframework.orm.hibernate3.HibernateTemplate;

public class HibernateRantDao {

	private HibernateTemplate hibernateTemplate;
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}
}
