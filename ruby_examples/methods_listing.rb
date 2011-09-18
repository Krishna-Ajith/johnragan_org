"I am a string object".methods.sort   # instance

String.methods.sort     # class methods


String.instance_methods.sort


String.instance_methods(false).sort     # does not show those that are inherited

"a string".singleton_methods.sort     # those defined on this single object


"a string".private_methods
"a string".public_methods
"a string".protected_methods



