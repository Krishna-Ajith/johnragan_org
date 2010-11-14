package org.johnragan.familytree.web;

import org.springframework.roo.addon.web.mvc.controller.RooWebScaffold;
import org.johnragan.familytree.models.Person;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

@RooWebScaffold(path = "people", formBackingObject = Person.class)
@RequestMapping("/people")
@Controller
public class PersonController {
}
