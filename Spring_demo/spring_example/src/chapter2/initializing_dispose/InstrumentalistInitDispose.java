package chapter2.initializing_dispose;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

import chapter2.springidol.Instrumentalist;

public class InstrumentalistInitDispose extends Instrumentalist implements InitializingBean, DisposableBean {

	@Override
	public void destroy() throws Exception {
		this.cleanInstrument();
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		this.tuneInstrument();
	}
}
