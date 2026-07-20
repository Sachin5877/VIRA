import re


def extract_iocs(text):

    ips = list(set(re.findall(
        r"\b(?:\d{1,3}\.){3}\d{1,3}\b",
        text
    )))

    domains = list(set(re.findall(
        r"\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b",
        text
    )))

    urls = list(set(re.findall(
        r"https?://[^\s]+",
        text
    )))

    emails = list(set(re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )))

    md5 = re.findall(
        r"\b[a-fA-F0-9]{32}\b",
        text
    )

    sha1 = re.findall(
        r"\b[a-fA-F0-9]{40}\b",
        text
    )

    sha256 = re.findall(
        r"\b[a-fA-F0-9]{64}\b",
        text
    )

    return {
        "ips": ips,
        "domains": domains,
        "urls": urls,
        "emails": emails,
        "md5": md5,
        "sha1": sha1,
        "sha256": sha256
    }