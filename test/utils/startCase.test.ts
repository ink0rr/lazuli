import { assertEquals } from "../../dev_deps.ts";
import { startCase } from "../../lib/utils/startCase.ts";

Deno.test("startCase", () => {
  assertEquals(startCase("foo bar"), "Foo Bar");
  assertEquals(startCase("fooBar"), "Foo Bar");
  assertEquals(startCase("__foo_bar_"), "Foo Bar");
  assertEquals(startCase("--foo-bar--"), "Foo Bar");
  assertEquals(startCase("foo's bar"), "Foo's Bar");
  assertEquals(startCase("  foo  bar  "), "Foo Bar");
  assertEquals(startCase("FOO_BAR"), "FOO BAR");
  assertEquals(startCase("fBar"), "F Bar");
  assertEquals(startCase("123"), "123");
  assertEquals(startCase(""), "");
});
