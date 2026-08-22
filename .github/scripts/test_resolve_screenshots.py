import unittest

from resolve_screenshots import extract_url, to_raw_url

RAW_DESC_1 = """
### Screenshots

Homescreen <img width="732" height="828" alt="Image" src="https://github.com/user-attachments/assets/d6d314c5-5769-4099-bb35-c7ca3ec1ff7f" />

Add expenses <img width="735" height="837" alt="Image" src="https://github.com/user-attachments/assets/bcac1219-ddfc-4f22-90ca-46c5db0eeae5" />

Entry history <img width="728" height="843" alt="Image" src="https://github.com/user-attachments/assets/741a2d79-aab6-4bbc-b749-7995c42c2866" />
Settings <img width="733" height="826" alt="Image" src="https://github.com/user-attachments/assets/7b1b246a-d7dd-41d2-b04b-37f57702b589" />
"""

RAW_DESC_2 = """
###Screenshots
<img width="400" height="459" alt="Image" src="https://github.com/user-attachments/assets/ec6be17c-18da-46b0-bac5-32887f52e367" />

<img width="400" height="459" alt="Image" src="https://github.com/user-attachments/assets/82ee4835-dcf3-4464-a442-30be5967b18b" />
"""

RAW_DESC_3 = """
###Screenshots
![](https://github.com/user-attachments/assets/ec6be17c-18da-46b0-bac5-32887f52e367)
![](https://github.com/user-attachments/assets/82ee4835-dcf3-4464-a442-30be5967b18b)
"""

RAW_DESC_4 = """
###Screenshots
![]("https://github.com/user-attachments/assets/ec6be17c-18da-46b0-bac5-32887f52e367")
![](https://github.com/user-attachments/assets/82ee4835-dcf3-4464-a442-30be5967b18b)
"""


class ExtractUrlTests(unittest.TestCase):
    def test_plain_url(self):
        self.assertEqual(
            extract_url("https://github.com/user-attachments/assets/abc"),
            "https://github.com/user-attachments/assets/abc",
        )

    def test_plain_url_with_surrounding_whitespace(self):
        self.assertEqual(
            extract_url("  https://example.com/a.png  "),
            "https://example.com/a.png",
        )

    def test_markdown_image(self):
        self.assertEqual(
            extract_url("![screenshot](https://example.com/a.png)"),
            "https://example.com/a.png",
        )

    def test_markdown_image_with_title(self):
        self.assertEqual(
            extract_url('![screenshot](https://example.com/a.png "home screen")'),
            "https://example.com/a.png",
        )

    def test_markdown_image_empty_alt(self):
        self.assertEqual(
            extract_url("![](https://example.com/a.png)"),
            "https://example.com/a.png",
        )

    def test_html_img_src_double_quotes(self):
        self.assertEqual(
            extract_url('<img src="https://example.com/a.png">'),
            "https://example.com/a.png",
        )

    def test_html_img_src_single_quotes(self):
        self.assertEqual(
            extract_url("<img src='https://example.com/a.png'>"),
            "https://example.com/a.png",
        )

    def test_html_img_href_typo(self):
        self.assertEqual(
            extract_url('<img href="https://example.com/a.png">'),
            "https://example.com/a.png",
        )

    def test_html_img_with_other_attributes_before_src(self):
        self.assertEqual(
            extract_url(
                '<img alt="home screen" width="300" src="https://example.com/a.png">'
            ),
            "https://example.com/a.png",
        )

    def test_html_img_self_closing(self):
        self.assertEqual(
            extract_url('<img src="https://example.com/a.png" />'),
            "https://example.com/a.png",
        )

    def test_real_example_1(self):
        self.assertEqual(
            extract_url(RAW_DESC_1),
            "https://github.com/user-attachments/assets/d6d314c5-5769-4099-bb35-c7ca3ec1ff7f",
        )

    def test_real_example_2(self):
        self.assertEqual(
            extract_url(RAW_DESC_2),
            "https://github.com/user-attachments/assets/ec6be17c-18da-46b0-bac5-32887f52e367",
        )

    def test_real_example_3(self):
        self.assertEqual(
            extract_url(RAW_DESC_3),
            "https://github.com/user-attachments/assets/ec6be17c-18da-46b0-bac5-32887f52e367",
        )

    def test_real_example_4(self):
        self.assertEqual(
            extract_url(RAW_DESC_4),
            "https://github.com/user-attachments/assets/ec6be17c-18da-46b0-bac5-32887f52e367",
        )


class ToRawUrlTests(unittest.TestCase):
    def test_github_blob_url_is_rewritten(self):
        self.assertEqual(
            to_raw_url("https://github.com/user/repo/blob/main/screenshots/a.png"),
            "https://raw.githubusercontent.com/user/repo/main/screenshots/a.png",
        )

    def test_non_blob_url_is_untouched(self):
        url = "https://github.com/user-attachments/assets/abc"
        self.assertEqual(to_raw_url(url), url)

    def test_non_github_url_is_untouched(self):
        url = "https://example.com/a.png"
        self.assertEqual(to_raw_url(url), url)


if __name__ == "__main__":
    unittest.main()
