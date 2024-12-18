import { useBlockProps, RichText } from '@wordpress/block-editor';
import { TextControl, Button, PanelBody, PanelRow } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

const EditComponent = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { plans } = attributes;

    // Add a new plan dynamically
    const addNewPlan = () => {
        const newPlan = {
            title: 'New Plan',
            price: '$0',
            features: ['Feature 1', 'Feature 2'],
            buttonLabel: 'Sign up',
        };
        setAttributes({ plans: [...plans, newPlan] });
    };

    // Update a specific plan attribute
    const updatePlan = (index, key, value) => {
        const updatedPlans = [...plans];
        updatedPlans[index][key] = value;
        setAttributes({ plans: updatedPlans });
    };

    // Update a specific feature in a plan
    const updateFeature = (index, featureIndex, value) => {
        const updatedPlans = [...plans];
        updatedPlans[index].features[featureIndex] = value;
        setAttributes({ plans: updatedPlans });
    };

    // Add a new feature to a plan
    const addFeature = (index) => {
        const updatedPlans = [...plans];
        updatedPlans[index].features.push('New Feature');
        setAttributes({ plans: updatedPlans });
    };

    // Remove a specific feature
    const removeFeature = (index, featureIndex) => {
        const updatedPlans = [...plans];
        updatedPlans[index].features.splice(featureIndex, 1);
        setAttributes({ plans: updatedPlans });
    };

    return (
        <>
            {/* Inspector Controls */}
            <InspectorControls>
                <PanelBody title={__('Add New Plan', 'dynamic-pricing-block')} initialOpen={true}>
                    <PanelRow>
                        <Button isPrimary onClick={addNewPlan}>
                            {__('Add Another Plan', 'dynamic-pricing-block')}
                        </Button>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            {/* Block Content */}
            <div {...blockProps} className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {plans.map((plan, index) => (
                    <div key={index} className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                {/* Editable Plan Title */}
                                <RichText
                                    tagName="h4"
                                    value={plan.title}
                                    placeholder={__('Plan Title', 'dynamic-pricing-block')}
                                    onChange={(value) => updatePlan(index, 'title', value)}
                                />
                            </div>
                            <div className="card-body">
                                {/* Editable Price */}
                                <h1 className="card-title pricing-card-title">
                                    <RichText
                                        tagName="span"
                                        value={plan.price}
                                        placeholder={__('Price', 'dynamic-pricing-block')}
                                        onChange={(value) => updatePlan(index, 'price', value)}
                                    />
                                    <small className="text-muted fw-light">/mo</small>
                                </h1>

                                {/* Editable Feature List */}
                                <ul className="list-unstyled mt-3 mb-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                            <TextControl
                                                value={feature}
                                                placeholder={__('Feature', 'dynamic-pricing-block')}
                                                onChange={(value) =>
                                                    updateFeature(index, featureIndex, value)
                                                }
                                            />
                                            <Button
                                                isSmall
                                                variant="secondary"
                                                onClick={() => removeFeature(index, featureIndex)}
                                            >
                                                {__('Remove', 'dynamic-pricing-block')}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="link" onClick={() => addFeature(index)}>
                                    {__('Add Feature', 'dynamic-pricing-block')}
                                </Button>

                                {/* Editable Button Text */}
                                <Button
                                    variant="primary"
                                    className="w-100 btn btn-lg"
                                //onClick={() => alert(__('Button Clicked!', 'dynamic-pricing-block'))}
                                >
                                    <RichText
                                        tagName="span"
                                        value={plan.buttonLabel}
                                        placeholder={__('Button Text', 'dynamic-pricing-block')}
                                        onChange={(value) => updatePlan(index, 'buttonLabel', value)}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EditComponent;
