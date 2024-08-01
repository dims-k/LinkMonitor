function FIND_LINK_ON_SITE(linkA, siteB) {
  if (!linkA || !siteB) {
    return " ";
  }

  try {
    var response = UrlFetchApp.fetch(siteB, { muteHttpExceptions: true });
    var responseCode = response.getResponseCode();

    if (responseCode.toString().startsWith("4")) {
      return responseCode;
    }

    var html = response.getContentText();
    var anchorPattern = /<a[^>]+href="(.*?)"[^>]*>/gi;
    var match;
    var linkFound = false;

    while ((match = anchorPattern.exec(html)) !== null) {
      var href = match[1];
      if (href === linkA) {
        linkFound = true;
        break;
      }
    }

    return linkFound ? "Link found" : "Link not found";
  } catch (error) {
    return "Error: " + error.message;
  }
}

function GET_LINK_TYPE(linkA, siteB) {
  if (!linkA || !siteB) {
    return " ";
  }

  try {
    var response = UrlFetchApp.fetch(siteB, { muteHttpExceptions: true });
    var responseCode = response.getResponseCode();

    if (responseCode.toString().startsWith("4")) {
      return responseCode;
    }

    var html = response.getContentText();
    var anchorPattern = /<a[^>]+href="(.*?)"[^>]*>/gi;
    var match;
    var linkType = null;

    while ((match = anchorPattern.exec(html)) !== null) {
      var href = match[1];
      if (href === linkA) {
        var relPattern = /rel="(.*?)"/i;
        var relMatch = relPattern.exec(match[0]);
        linkType = (relMatch && relMatch[1].toLowerCase().includes("nofollow")) ? "nofollow" : "dofollow";
        break;
      }
    }

    return linkType ? linkType : "Link not found";
  } catch (error) {
    return "Error: " + error.message;
  }
} 

function GET_ANCHOR_TEXT(linkA, siteB) {
  if (!linkA || !siteB) {
    return " ";
  }

  try {
    var response = UrlFetchApp.fetch(siteB, { muteHttpExceptions: true });
    var responseCode = response.getResponseCode();

    if (responseCode.toString().startsWith("4")) {
      return responseCode;
    }

    var html = response.getContentText();
    var anchorPattern = /<a[^>]+href="(.*?)"[^>]*>(.*?)<\/a>/gi;
    var match;
    var anchorText = null;

    while ((match = anchorPattern.exec(html)) !== null) {
      var href = match[1];
      if (href === linkA) {
        anchorText = match[2];
        break;
      }
    }

    return anchorText ? anchorText : " - ";
  } catch (error) {
    return "Error: " + error.message;
  }
}
