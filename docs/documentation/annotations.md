---
layout: default
title: Annotations
id: annotations
section: documentation
---


<div markdown="1" class="span12">

Annotations provide information on how a particular field or model class
should behave. The most commonly used annotations, and examples of their implementation are documented in [Using Annotations](/using-annotations.html).

### Field Annotations

#### @InternalNamePrefix(String)

> Specifies the prefix for the internal names of all fields in the target type.

#### @CollectionMaximum(int)

> Specifies the maximum number of items in the target field.

#### @CollectionMinimum(int)

> Specifies the minimum number of items in the target field.

#### @DisplayName(String)

> Specifies the target field's display name.

#### @Embedded

> Specifies whether the target field value is embedded. This can also be applied at a class level.

#### @Ignored

> Specifies whether the target field is ignored.

#### @Indexed

> Specifies whether the target field value is indexed.

#### @Indexed(unique=true)

> Specifies whether the target field value is indexed, and whether it should be unique.

#### @InternalName(String)

> Specifies the target field's internal name.

#### @Maximum(double)

> Specifies either the maximum numeric value or string length of the target field. Our example uses a 5 Star review option.

#### @Minimum(double)

> Specifies either the minimum numeric value or string length of the target field. The user can input 0 out of 5 for the review.

#### @Step(double)

> Specifies the margin between entries in the target field.

#### @Regex(String)

> Specifies the regular expression pattern that the target field value must match.

#### @Required

> Specifies whether the target field value is required.
	
#### @Types(Class<Recordable>[])

> Specifies the valid types for the target field value. `@Types({Image.class, Video.class, Widget.class})` Deprecated @FieldTypes(Class<Recordable>[])

#### @FieldUnique

> Deprecated. Use `@Indexed(Unique=true)` instead.

#### @Values

> Specifies the valid values for the target field value.

### Class Annotations

#### @Abstract

> Specifies whether the target type is abstract and can't be used to create a concrete instance.

#### @DisplayName(String)

> Specifies the target type's display name.

#### @Embedded

> Specifies whether the target type data is always embedded within another type data.

#### @InternalName(String)

> Specifies the target type's internal name.

#### @Recordable.LabelFields(String[])

> Specifies the field names that are used to retrieve the labels of the objects represented by the target type.

#### @Recordable.PreviewField

> Specifies the field name used to retrieve the previews of the objects represented by the target type.

#### @Recordable.JunctionField

> Specifies the name of the field in the junction query that should be used to populate the target field.

#### @Recordable.JunctionPositionField

> Specifies the name of the position field in the junction query that should be used to order the collection in the target field.


### Tool UI Annotations


The @ToolUi Library  `import com.psddev.cms.db.ToolUi;` gives you more options for controlling the UI display in Brightspot using annotations.

#### @ToolUi.Note("String")

> To provide the user with an instruction or note for a field in the CMS, simply use `@ToolUi.Note`. Within the UI it will appear above the specified field. You can also add the annotation to a class, to provide a Note for that object type within the CMS.

#### @ToolUi.NoteHtml("<h1>String</h1>")

> Specifies the note, in raw HTML, displayed along with the target in the UI.

The note can also display dynamic content. In the example below the editor can be alerted to the content that will be used if the field is left blank. See the `@ToolUi.Placeholder` annotation for more options here also:
{% highlight java %}
public class Image extends Content {

	private String name;
	private StorageItem file;
	@ToolUi.NoteHtml("<span data-dynamic-html='<strong>${content.name}</strong>
	will be used as altText if this is left blank'></span>")
	private String altText;
}
{% endhighlight %}

![](http://docs.brightspot.s3.amazonaws.com/note-html-ui.png)

#### @ToolUi.Heading("String")

> Provides a horizontal rule within the Content Object, allowing new sections to be created with headings.

#### @ToolUi.Hidden

> A target field can be hidden from the UI.

#### @ToolUi.OnlyPathed

> If you want the target field to only contain objects with a URL path.

#### @ToolUi.ReadOnly

> Specifies that the target field is read-only.

#### @ToolUi.Placeholder("String")

> Specifies the target field's placeholder text.

You can also add dynamic content as placeholder text, using any existing attribute on the content, or a dynamic not. This allows the editorial interface to accurately represent any overrides of content that happen on the front-end.

In the example below the name field appears as a placeholder in the altText field of the image object. If an editor clicks into the altText field they can add to or modify the text thanks to the `editable=true` option . This increases editor efficiency.

{% highlight java %}public class Image extends Content {

    private String name;
    private StorageItem file;
    @ToolUi.Placeholder(dynamicText = "${content.name}", editable=true)
    private String altText;

}
{% endhighlight %}

In the CMS user interface, the placeholder text is shown in grey - and darkens on hover:

![](http://docs.brightspot.s3.amazonaws.com/placeholder-text-ui.png)

Either use the `beforeSave()` method in your class to populate the field on save ([documentation on beforeSave](/triggers.html)), or if the placeholder text is being used to indicate what will be rendered in it's place on the front-end if left blank, add logic to your JSP. In the example below when the altText field is left null, the name field is used.
{% highlight jsp %}
<c:choose>
   	<c:when test="${empty content.altText}">
   		<cms:img src="${content}" size="${imageSize}" overlay="true" alt="${content.name}"/>
   	</c:when>
   	<c:otherwise>
   		<cms:img src="${content}" size="${imageSize}" overlay="true" alt="${content.altText}"/>
   	</c:otherwise>
</c:choose>
{% endhighlight %}

A method can also be used:

{% highlight java %}public class Image extends Content {

    private String name;
    private StorageItem file;
    @ToolUi.Placeholder(dynamicText = "${content.example()}", editable=true)
    private String altText;

    public String example() {
       return "Return the placeholder content here"
    }
}
{% endhighlight %}
#### @ToolUi.DisplayType

> Specifies the internal type used to render the target field.

#### @ToolUi.Referenceable

> Specifies whether the instance of the target type can be referenced (added) by a referential text object (rich text editor). For example, an Image object that you want to be available as an Enhancement must have this annotation.

#### @ToolUi.CompatibleTypes

> Specifies an array of compatible types that the target type may switch to.

#### @ToolUi.SuggestedMaximum(int)

> This annotation is used to indicate a suggested upper limit on the length of the field.
The value passed to the annotation is the limiting value.  When a user is modifying a field annotated, an indicator will appear when the input size has exceeded the specified limit.

#### @ToolUi.SuggestedMinimum(int)

> This annotation is used to indicate a suggested lower limit on the length of the field.
The value passed to the annotation is the limiting value.  When a user is modifying a field annotated, an indicator will appear when the input size falls below the specified limit. 

#### @ToolUi.FieldSorted

> Specifies whether the values in the target field should be sorted before being saved.

#### @ToolUi.InputProcessorPath()

> Specifies the path to the processor used to render and update the target field.

#### @ToolUi.InputSearcherPath()

> Specifies the path to the searcher used to find a value for the target field.

#### @ToolUi.RichText

> Specifies whether the target field should offer rich-text editing options. This allows String fields to contain rich text controls.

#### @ToolUi.Suggestions

> Specifies whether the target field should offer suggestions.

#### @ToolUi.DropDown

> Specifies whether the target field should be displayed as a drop-down menu.

#### @ToolUi.GlobalFilter

> Specifies whether the target type shows up as a filter that can be applied to any types in search.

#### @ToolUi.Filterable

> Specifies whether the target field should be offered as a filterable field in search.

#### @ToolUi.Sortable

> Specifies whether the target field should be offered as a sortable field in search.

#### @ToolUi.Where

> Limits results on the returned objects. Example `@ToolUi.Where("title ^= a" )` would limit the returned objects to ones whose title starts with the letter a. A field within an object can also be used. When returning a list of Articles, each with an Author, the annotation can be used like so: `@ToolUi.Where("author/name ^= a" )` 

> The `@ToolUi.Where` annotation can also be used to limit object types based on a common interface. In the example below, only objects that are taggable can be chosen.
{% highlight java %}
@ToolUi.Where("groups = com.psddev.brightspot.Taggable") 
List <ObjectType> types; 
{% endhighlight %}

#### @ToolUi.Tab("tabName")

> Creates a new Tab interface in the content edit view, with the annotated fields appearing within it.

#### @ToolUi.Secret 

> Specifies whether the target field display should be scrambled. 

#### @ToolUi.DisplayFirst / @ToolUi.DisplayLast

> Annotate fields added through a class modification to change the default behavior (appearing last) and order them accordingly.

#### @ToolUi.CodeType

> Specifies the type of input text. Example String fields can be defined as `@ToolUi.CodeType("text/css")` to present inline numbers and css code styles. For a full list of valid values see [CodeMirror Documentation](http://codemirror.net/mode/). Use the MIME type.

#### @ToolUi.CssClass

> Add a custom CSS Class that can style the .inputContainer

#### @ToolUi.BulkUpload

> Specifies whether the target field should enable and accept files using the bulk upload feature.

#### @ToolUi.Expanded

> Specifies whether the target field should always be expanded in an embedded display.


</div>

