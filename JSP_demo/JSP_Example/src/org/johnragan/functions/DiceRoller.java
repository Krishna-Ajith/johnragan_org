package org.johnragan.functions;

public class DiceRoller {
	public static int rollDice() {
        return (int) ( (Math.random() * 6) + 1);
   }
}
