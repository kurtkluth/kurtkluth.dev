---
sidebar_position: 1
---

I'll guide you through setting up drilldowns in Splunk dashboards to enhance user interaction. This is a powerful feature that allows users to navigate from a high-level view to detailed information.

## Setting Up Drilldowns in Splunk Dashboards

### Step 1: Configure the Source Dashboard

First, you need to set up the initial dashboard with drilldown capabilities:

```xml
<dashboard version="1.1" theme="dark">
  <label>VERA Vulnerability Overview</label>
  
  <row>
    <panel>
      <title>Vulnerability Categories</title>
      <chart>
        <search>
          <query>
          <![CDATA[
          index=it_sec sourcetype="tenable:sc:vuln" earliest=-45d latest=now [|inputlookup vera_servers_lower.csv | fields dnsName | format]
                    | eval category = case(
                        like(pluginName, "Google Chrome %"), "Browser - Chrome",
                        like(pluginName, "Microsoft %"), "Microsoft Products",
                        like(pluginName, "Apache %"), "Apache",
                        like(pluginName, "Splunk %"), "Splunk",
                        like(pluginName, "Oracle %"), "Oracle",
                        true(), "Other"
                    )
                    | stats count by category
          ]]>
          </query>
        </search>
        <option name="charting.chart">pie</option>
        <option name="charting.drilldown">all</option>
        <drilldown>
          <link target="_blank">/app/search/vera_vulnerability_details?form.category=$click.value$</link>
        </drilldown>
      </chart>
    </panel>
  </row>
</dashboard>
```

### Step 2: Create the Target Dashboard

![image](https://github.com/user-attachments/assets/5eb2f4d8-effe-48a9-8789-d363bb3259f4)


Next, create a second dashboard that will receive the drilldown parameters:

```xml
<dashboard version="1.1" theme="dark">
  <label>VERA Vulnerability Details</label>
  
  <fieldset submitButton="false">
    <input type="text" token="category">
      <label>Category</label>
      <default>*</default>
    </input>
  </fieldset>
  
  <row>
    <panel>
      <title>Vulnerabilities by Type for $category$</title>
      <chart>
        <search>
          <query>
          <![CDATA[
          index=it_sec sourcetype="tenable:sc:vuln" earliest=-45d latest=now [|inputlookup vera_servers_lower.csv | fields dnsName | format]
                    | eval category = case(
                        like(pluginName, "Google Chrome %"), "Browser - Chrome",
                        like(pluginName, "Microsoft %"), "Microsoft Products",
                        like(pluginName, "Apache %"), "Apache",
                        like(pluginName, "Splunk %"), "Splunk",
                        like(pluginName, "Oracle %"), "Oracle",
                        true(), "Other"
                    )
                    | where category="$category$"
                    | eval vuln_type = case(
                        like(pluginName, "% Multiple Vulnerabilities%"), "Multiple Vulnerabilities",
                        like(pluginName, "% Vulnerability%"), "Single Vulnerability",
                        like(pluginName, "% RCE%"), "Remote Code Execution",
                        true(), "Other"
                    )
                    | stats count by vuln_type
          ]]>
          </query>
        </search>
        <option name="charting.chart">column</option>
      </chart>
    </panel>
  </row>
</dashboard>
```

## Advanced Drilldown Techniques

### 1. Passing Multiple Values

You can pass multiple values from your source dashboard:

```xml
<drilldown>
  <link target="_blank">/app/search/detailed_view?form.category=$click.value$&form.count=$click.value2$&form.time.earliest=$earliest$&form.time.latest=$latest$</link>
</drilldown>
```

### 2. Using Row Drilldowns in Tables

For tables, you can drill down based on row selection:

```xml
<table>
  <drilldown>
    <link target="_blank">/app/search/host_details?form.host=$row.host$</link>
  </drilldown>
</table>
```

### 3. Using Token Substitution

You can make drilldowns more dynamic using tokens:

```xml
<drilldown>
  <eval token="drilldown_search">
    "index=it_sec sourcetype=\"tenable:sc:vuln\" category=\"$click.value$\" | table host, pluginName, severity"
  </eval>
  <link target="_blank">/app/search/search?q=$drilldown_search$</link>
</drilldown>
```

### 4. Creating Nested Drilldowns

For multi-level drilldowns, configure each level to pass appropriate parameters:

```xml
<!-- Level 1 Dashboard -->
<drilldown>
  <link target="_blank">/app/search/category_details?form.category=$click.value$</link>
</drilldown>

<!-- Level 2 Dashboard -->
<drilldown>
  <link target="_blank">/app/search/host_details?form.category=$category$&form.host=$click.value$</link>
</drilldown>
```

## Complete Example with Chained Drilldowns

Here's a complete example that demonstrates a three-level drilldown system:

## Key Points for Implementing Drilldowns

### 1. Enable Drilldown Options
For each visualization, you need to enable drilldown capability:
```xml
<option name="charting.drilldown">all</option>
```

### 2. Passing Parameters
The key to effective drilldowns is properly passing parameters:
- Use `$click.value$` to pass the clicked value
- Use `$click.name$` or `$click.name2$` for series names
- Use `$row.fieldname$` for table rows
- Include time tokens with `$time_range.earliest$` and `$time_range.latest$`

### 3. Handling Parameters in Target Dashboards
In your target dashboard, define input fields to receive the parameters:
```xml
<input type="text" token="category">
  <label>Category</label>
  <default>*</default>
</input>
```

### 4. Advanced Token Manipulation
You can process tokens before passing them:
```xml
<eval token="search_query">
  "index=it_sec sourcetype=\"tenable:sc:vuln\" pluginName=\"" + $row.pluginName$ + "\""
</eval>
<link target="_blank">/app/search/search?q=$search_query$</link>
```

### 5. Target Options
You can control where the drilldown opens:
- `target="_blank"` - Opens in a new tab/window
- `target="_self"` - Opens in the same window (default)

### 6. Dynamic Time Range Drilldowns
When clicking on time charts, you can zoom in on specific time periods:

```xml
<drilldown>
  <eval token="time_start">relative_time(strptime($click.x$, "%Y-%m-%d %H:%M:%S"), "-12h")</eval>
  <eval token="time_end">relative_time(strptime($click.x$, "%Y-%m-%d %H:%M:%S"), "+12h")</eval>
  <link target="_blank">/app/search/search?q=your_search_query&earliest=$time_start$&latest=$time_end$</link>
</drilldown>
```

This evaluates the clicked time point and creates a 24-hour window around it (12 hours before and after).

### 7. Setting Tokens for Same-Page Updates
You can update parts of the current dashboard by setting tokens:

```xml
<drilldown>
  <set token="selected_host">$click.value$</set>
  <set token="show_details">true</set>
</drilldown>
```

Then use those tokens elsewhere in your dashboard:

```xml
<panel depends="$show_details$">
  <title>Details for $selected_host$</title>
  <!-- Panel content -->
</panel>
```

### 8. Conditional Logic in Drilldowns
You can implement conditional logic in your drilldowns:

```xml
<drilldown>
  <condition match="$click.value$=Unknown">
    <link>/app/search/unknown_values</link>
  </condition>
  <condition>
    <link>/app/search/known_values?form.value=$click.value$</link>
  </condition>
</drilldown>
```

## Best Practices for Splunk Drilldowns

1. **Maintain Context**: Always pass relevant context (time range, filters) to maintain continuity between dashboards.

2. **Use Descriptive Dashboard Names**: Name your dashboards descriptively to make navigation intuitive.

3. **Provide Navigation Options**: Include breadcrumbs or "back" links in drilldown dashboards.

4. **Pre-filter Target Dashboards**: Apply filters in target dashboards based on parameters to improve load times.

5. **Document Parameter Requirements**: If your dashboards expect specific URL parameters, document them.

6. **Test Different Scenarios**: Ensure drilldowns work for all possible data selections and edge cases.

7. **Consider Performance**: Limit the amount of data passed through URL parameters to avoid long URLs.

8. **Use Modal Drilldowns**: For simple data expansions, consider modal panels instead of navigating to new dashboards.

## Implementing a Complete Drill-Path in Your Environment

1. **Plan Your Hierarchy**: Map out your drill-path (overview → category → host → specific vulnerability).

2. **Create Base Dashboards**: Develop your base dashboards with normalized data and clear visualizations.

3. **Add Drilldown Functionality**: Implement drilldowns with appropriate parameter passing.

4. **Test End-to-End**: Validate the entire drill-path with various starting points and selections.

5. **Refine Based on User Feedback**: Adjust based on how users actually navigate your dashboards.

The example dashboards I provided create a comprehensive three-level drilldown system that allows users to navigate from:

1. **Overview** dashboard (by category or host)
2. **Category details** dashboard (by vulnerability type or specific plugin)
3. **Host details** dashboard (with optional category filtering)
4. **Specific vulnerability analysis** dashboard (detailed analysis of vulnerability types)

This structured approach provides intuitive navigation while maintaining context throughout the exploration process. Users can quickly identify trends at a high level and then drill down to investigate specific issues.


<!--
# Manage Docs Versions

Docusaurus can manage multiple versions of your docs.

## Create a docs version

Release a version 1.0 of your project:

```bash
npm run docusaurus docs:version 1.0
```

The `docs` folder is copied into `versioned_docs/version-1.0` and `versions.json` is created.

Your docs now have 2 versions:

- `1.0` at `http://localhost:3000/docs/` for the version 1.0 docs
- `current` at `http://localhost:3000/docs/next/` for the **upcoming, unreleased docs**

## Add a Version Dropdown

To navigate seamlessly across versions, add a version dropdown.

Modify the `docusaurus.config.js` file:

```js title="docusaurus.config.js"
export default {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'docsVersionDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

The docs version dropdown appears in your navbar:

![Docs Version Dropdown](./img/docsVersionDropdown.png)

## Update an existing version

It is possible to edit versioned docs in their respective folder:

- `versioned_docs/version-1.0/hello.md` updates `http://localhost:3000/docs/hello`
- `docs/hello.md` updates `http://localhost:3000/docs/next/hello`

--->
