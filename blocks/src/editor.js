import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button, TextControl, CheckboxControl, PanelBody, PanelRow } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useRef, useEffect } from '@wordpress/element';
import { keyboardReturn } from '@wordpress/icons';
import { URLPopover } from '@wordpress/block-editor';

const EditComponent = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { plans } = attributes;

    // URL Popover visibility and URLs state
    const [popoverVisible, setPopoverVisible] = useState({});
    const [buttonURLs, setButtonURLs] = useState({});
    const [openInNewTab, setOpenInNewTab] = useState({}); // To store the open-in-new-tab setting for each plan
    const popoverRefs = useRef({});

    // Initialize button URLs and open-in-new-tab state from attributes
    useEffect(() => {
        const initialButtonURLs = {};
        const initialOpenInNewTab = {};
        plans.forEach((_, index) => {
            initialButtonURLs[index] = attributes[`buttonURL${index + 1}`] || '';
            initialOpenInNewTab[index] = attributes[`openInNewTab${index + 1}`] || false; // Set initial state for new tab
        });
        setButtonURLs(initialButtonURLs);
        setOpenInNewTab(initialOpenInNewTab);
    }, [attributes]);

    // Handle URL change
    const handleURLChange = (index, value) => {
        setButtonURLs((prev) => ({ ...prev, [index]: value }));
    };

    // Handle Open in New Tab change
    const handleOpenInNewTabChange = (index, value) => {
        setOpenInNewTab((prev) => ({ ...prev, [index]: value }));
    };

    // Handle URL submit (save)
    const handleURLSubmit = (index) => {
        setAttributes({ [`buttonURL${index + 1}`]: buttonURLs[index], [`openInNewTab${index + 1}`]: openInNewTab[index] });
        setPopoverVisible((prev) => ({ ...prev, [index]: false }));
    };

    // Toggle Popover visibility
    const handleButtonMouseOver = (index) => {
        setPopoverVisible((prev) => ({ ...prev, [index]: true }));
    };

    // Redirect to URL on button click
    const handleButtonClick = (index) => {
        const url = buttonURLs[index];
        if (url) {
            const target = openInNewTab[index] ? '_blank' : '_self'; // Use target based on user setting
            window.open(url, target); // Open the URL with the selected target
        }
    };

    // Delete a plan
    const deletePlan = (index) => {
        const updatedPlans = plans.filter((_, i) => i !== index);
        setAttributes({ plans: updatedPlans });
    };

    // Delete a feature
    const deleteFeature = (planIndex, featureIndex) => {
        const updatedPlans = plans.map((plan, i) => {
            if (i === planIndex) {
                const updatedFeatures = plan.features.filter((_, fi) => fi !== featureIndex);
                return { ...plan, features: updatedFeatures };
            }
            return plan;
        });
        setAttributes({ plans: updatedPlans });
    };

    return (
        <>
            {/* Inspector Controls */}
            <InspectorControls>
                <PanelBody title="Add New Plan" initialOpen={true}>
                    <PanelRow>
                        <Button isPrimary onClick={() => setAttributes({ plans: [...plans, { title: 'New Plan', price: '$0', features: ['Feature 1'], buttonLabel: 'Sign Up' }] })}>
                            Add Another Plan
                        </Button>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            {/* Block Content */}
            <div {...blockProps} className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {plans.map((plan, index) => (
                    <div key={index} className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                <RichText
                                    tagName="h4"
                                    value={plan.title}
                                    placeholder="Plan Title"
                                    onChange={(value) => setAttributes({ plans: plans.map((p, i) => (i === index ? { ...p, title: value } : p)) })}
                                />
                                {/* Delete Plan Button */}
                                <Button
                                    isDestructive
                                    onClick={() => deletePlan(index)}
                                    icon="trash"
                                    label="Delete Plan"
                                    className="ms-2"
                                />
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">
                                    <RichText
                                        tagName="span"
                                        value={plan.price}
                                        placeholder="Price"
                                        onChange={(value) => setAttributes({ plans: plans.map((p, i) => (i === index ? { ...p, price: value } : p)) })}
                                    />
                                    <small className="text-muted fw-light">/mo</small>
                                </h1>

                                <ul className="list-unstyled mt-3 mb-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="d-flex justify-content-between align-items-center">
                                            <TextControl
                                                value={feature}
                                                placeholder="Feature"
                                                onChange={(value) => setAttributes({ plans: plans.map((p, i) => (i === index ? { ...p, features: p.features.map((f, fi) => (fi === featureIndex ? value : f)) } : p)) })}
                                            />
                                            {/* Delete Feature Button */}
                                            <Button
                                                isDestructive
                                                onClick={() => deleteFeature(index, featureIndex)}
                                                icon="trash"
                                                label="Delete Feature"
                                                className="ms-2"
                                            />
                                        </li>
                                    ))}
                                </ul>

                                <Button variant="link" onClick={() => setAttributes({ plans: plans.map((p, i) => (i === index ? { ...p, features: [...p.features, 'New Feature'] } : p)) })}>
                                    Add Feature
                                </Button>

                                {/* Editable Button Text */}
                                <Button
                                    variant="primary"
                                    className="w-100 btn btn-lg"
                                    onMouseOver={() => handleButtonMouseOver(index)}
                                >
                                    <RichText
                                        tagName="span"
                                        value={plan.buttonLabel}
                                        placeholder="Button Text"
                                        onChange={(value) => setAttributes({ plans: plans.map((p, i) => (i === index ? { ...p, buttonLabel: value } : p)) })}
                                    />
                                </Button>

                                {/* URL Popover */}
                                {popoverVisible[index] && (
                                    <URLPopover
                                        ref={(el) => (popoverRefs.current[index] = el)}
                                        onClose={() => setPopoverVisible((prev) => ({ ...prev, [index]: false }))}
                                        style={{ minWidth: '400px' }} // Increase width of the popover container
                                    >
                                        <PanelBody>
                                            <PanelRow>
                                                <TextControl
                                                    label="URL"
                                                    placeholder="Link inside"
                                                    value={buttonURLs[index] || ""}
                                                    onChange={(value) => handleURLChange(index, value)}
                                                    style={{ width: '100%', minWidth: '340px' }} // Ensures the input takes up all available space
                                                />
                                            </PanelRow>
                                            <PanelRow>
                                                <CheckboxControl
                                                    label="Open in new tab"
                                                    checked={openInNewTab[index] || false}
                                                    onChange={(value) => handleOpenInNewTabChange(index, value)}
                                                />
                                                <Button
                                                    icon={keyboardReturn}
                                                    label="Save URL"
                                                    isPrimary
                                                    onClick={() => handleURLSubmit(index)}
                                                />
                                            </PanelRow>
                                        </PanelBody>
                                    </URLPopover>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EditComponent;
