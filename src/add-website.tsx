import { Form, ActionPanel, Action } from "@raycast/api";
import puppeteer from "puppeteer";
import { htmlToMarkdown } from "webforai";

type Values = {
  website: string;
};

export default function Command() {
  async function handleSubmit(values: Values) {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    await page.goto(values.website);

    const html = await page.content();
    await page.close();
    await browser.close();

    const markdown = htmlToMarkdown(html, { solveLinks: values.website });

    console.log(markdown);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="website" title="Website URL" placeholder="https://example.com" />
    </Form>
  );
}
