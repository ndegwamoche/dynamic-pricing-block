import { useState } from '@wordpress/element';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/components';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Editor Component
 */
const EditComponent = ({ attributes, setAttributes }) => {
    // Default to an empty plan if `plans` is undefined
    const { plans = [{ name: '', price: '', features: [] }] } = attributes;

    const addFeature = (planIndex) => {
        const newPlans = [...plans];
        newPlans[planIndex].features.push('New Feature');
        setAttributes({ plans: newPlans });
    };

    const handleFeatureChange = (planIndex, featureIndex, value) => {
        const newPlans = [...plans];
        newPlans[planIndex].features[featureIndex] = value;
        setAttributes({ plans: newPlans });
    };

    const handlePlanNameChange = (planIndex, value) => {
        const newPlans = [...plans];
        newPlans[planIndex].name = value;
        setAttributes({ plans: newPlans });
    };

    const handlePriceChange = (planIndex, value) => {
        const newPlans = [...plans];
        newPlans[planIndex].price = value;
        setAttributes({ plans: newPlans });
    };

    return (
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {plans.map((plan, planIndex) => (
                <div className="col" key={planIndex}>
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <RichText
                                tagName="h4"
                                className="my-0 fw-normal"
                                value={plan.name}
                                onChange={(value) => handlePlanNameChange(planIndex, value)}
                                placeholder="Plan Name"
                            />
                        </div>
                        <div className="card-body">
                            <RichText
                                tagName="h1"
                                className="card-title pricing-card-title"
                                value={plan.price}
                                onChange={(value) => handlePriceChange(planIndex, value)}
                                placeholder="Plan Price"
                            />
                            <ul className="list-unstyled mt-3 mb-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>
                                        <RichText
                                            tagName="span"
                                            value={feature}
                                            onChange={(value) => handleFeatureChange(planIndex, featureIndex, value)}
                                            placeholder="Feature"
                                        />
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                onClick={() => addFeature(planIndex)}
                                className="w-100 btn btn-sm btn-outline-primary"
                            >
                                Add Feature
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EditComponent;
